/* global record, sendFunction */
record.menu = {
    nodes : {
        elems : [], 
        link : null,
        icon : '&#8801;',
        handle : showNodesSubMenu
    },
    point : {
        elems : [], 
        link : null,
        icon : '&#9675;',
        handle : showPointSubMenu
    },
    mouse : {
        elems : [], 
        link : null,
        icon : '&#9997;',
        handle : showMouseSubMenu
    }
};

record.link = null;
record.size = 50;
record.screenHeight = Math.max(
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
);
record.screenWidth = Math.max(
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
);

/**
 * Shows record menu
 * 
 * @private
 * 
 * @param {Object} event        Mouse click event object
 * @returns {boolean}           True if success
 */
function showRecordMenu (event) {
    // Ignoring Atouch elements
    if (event.target.dataset.owner === 'atouch') {
        return false;
    }

    if (event.type === 'contextmenu' && event.button === 2) {
        if (record.link) {
            record.link.parentNode.removeChild(record.link);
            record.link = null;
        }

        record.link = prepareRecordMenu(event);

        if (record.link) {
            document.body.appendChild(record.link);
            putElementToScreen();
        }
    }

    return true;
}

/**
 * Preparing recording menu element before viewing
 * 
 * @private
 * 
 * @param {type} event          Mouse click event object
 * @returns {Element}           Rerord menu element
 */
function prepareRecordMenu (event) {
    let elem = document.createElement('div'),
        scroll = getPageScroll ();

    elem.style.background = '#FDD';
    elem.style.position = 'absolute';
    elem.style.left = (event.clientX + scroll.x - (Object.keys(record.menu).length * record.size) / 2) + 'px';
    elem.style.top = (event.clientY + scroll.y + 25) + 'px';
    elem.style.width = (Object.keys(record.menu).length * record.size) + 'px';
    elem.style.height = record.size + 'px';
    elem.dataset.owner = 'atouch';
    elem.id = 'atouch_record-menu';

    for (let key in record.menu) {
        let button = document.createElement('button');
        button.style.width = (record.size - 10) + 'px';
        button.style.height = (record.size - 10) + 'px';
        button.style.margin = (record.size / 10) + 'px';
        button.style.cursor = 'pointer';
        button.dataset.owner = 'atouch';
        button.innerHTML = record.menu[key].icon;
        button.id = 'atouch_record-menu-' + key;
        button.addEventListener('click', record.menu[key].handle.bind(null, event.target));
        record.menu[key].link = button;
        elem.appendChild(button);
    }

    return elem;
}

/**
 * Show nodes selecting button on recording panel
 * 
 * @private
 * 
 * @param {Element} elem        Selected DOM element
 * @returns {boolean}           True if success
 */
function showNodesSubMenu (elem) {
    let list = getParentsList(elem),
        links = [],
        tmp_back,
        name = 'nodes';

    switchSubMenu(name);

    list.forEach(function (item, i, arr) {
        let button = document.createElement('button');
        button.style.height = (record.size - 10) + 'px';
        button.style.margin = (record.size / 10) + 'px';
        button.style.cursor = 'pointer';
        button.className = 'toucher_record-submenu-button';
        button.innerHTML = getHidByElement(item).toLowerCase();
        button.dataset.owner = 'atouch';
        
        button.onmouseover = function () {
            tmp_back = item.style.background;
            item.style.background = 'pink';
        };
        
        button.onmouseout = function () {
            item.style.background = tmp_back;
        };
        
        button.onclick = function () {
            if (sendFunction) {
                sendFunction(
                    getElementHierarchyString(item)
                );
            }
        };

        links.push(button);
    });
    
    if (!links.length) {
        putElementToScreen();
        return false;
    }

    links.forEach(function (item, i, arr) {
        item.style.position = 'absolute';
        item.style.top = ((i + 1) * record.size) + 'px';
        item.style.left = (record.menu[name].link.offsetLeft - 5) + 'px';
        record.link.style.height = (record.link.offsetHeight + record.size) + 'px';
        record.link.appendChild(item);
        if (item.offsetWidth + 10 > record.link.offsetWidth) {
            record.link.style.width = (item.offsetWidth + 10) + 'px';
        }
    });

    
    record.menu[name].elems = links;
    links = null;
    
    putElementToScreen();
    return true;
}

/**
 * Show mouse actions panel
 * 
 * @private
 * 
 * @returns {none}                  No return
 */
function showMouseSubMenu () {
    let name = 'mouse';
    switchSubMenu(name);
    
    putElementToScreen();
}

/**
 * Show action selecting panel
 * 
 * @private
 * 
 * @returns {none}                  No return
 */
function showPointSubMenu () {
    let name = 'point';
    switchSubMenu(name);
    
    putElementToScreen();
}

/**
 * Changing state of menu buttons - disabling selected menu button and activating other buttons
 * 
 * @private
 * 
 * @param {string} index        Selected menu button ident name
 * @returns {boolean}           True if success
 */
function switchSubMenu (index) {
    let trg_elems = record.link.getElementsByClassName('toucher_record-submenu-button');
    
    for (let key in record.menu) {
        record.menu[key].link.disabled = false;
    }
    
    record.menu[index].link.disabled = true;
    deleteAllChildByClass(record.link, 'toucher__class__action-button');

    if (trg_elems.length === 0) {
        return false;
    }
    
    // Remove prev submenu buttons
    while (trg_elems[0]) {
        record.link.removeChild(trg_elems[0]);
    }
   
    record.link.style.width = (Object.keys(record.menu).length * record.size) + 'px';
    record.link.style.height = record.size + 'px';

    // [].forEach.call(trg_elems, function(el) {
    // menu.removeChild(el);
    // });
    
    return true;
}

// Ниже функции для переноса в общую област видимости

/**
 * Collects node parent elements to list
 * 
 * @private
 * 
 * @param {type} elem                   Selected DOM element
 * @returns {Array}                     Parents list
 */
function getParentsList (elem) {
    let list = [];
    let parent = elem;
    
    list.push(parent);
    while (parent.nodeName && parent.nodeName !== 'BODY' && parent.nodeName !== 'HTML') {
        parent = parent.parentNode;
        list.push(parent);
    }

    return list;
}

/**
 * Generates element unique name via ID, className, tagName
 * 
 * @private
 * 
 * @param {HTMLElement} element         Selected DOM element
 * @returns {string}                    Element unique name
 */
function getHidByElement (element) {
    let finder = element.nodeName;
    
    if (element.id) {
        finder += '#' + element.id;
    } else if (element.className) {
        let classes = element.className.split(' '),
            first_class = classes[0],
            class_childs = element.parentNode.getElementsByClassName(first_class);
        
        for (let i = 0, max = class_childs.length; i < max; i++) {
            if (class_childs[i] === element) {
                finder += '.' + first_class + '[' + i + ']';
            }
        }
    } else {
        if (element.name) {
            finder += '[name="' + element.name + '"]';
        }
        
        let tag_name = element.nodeName,
            parent_childs = element.parentNode.getElementsByTagName(tag_name);
        
        for (let i = 0, max = parent_childs.length; i < max; i++) {
            if (parent_childs[i] === element) {
                finder += '[' + i + ']';
            }
        }
    }

    return finder;
}

/**
 * Concatenates DOM element and it parents hids
 * 
 * @private
 * 
 * @param {HTMLElement} element         Target DOM element
 * @returns {string}                    Concatenated hids string
 */
function getElementHierarchyString (element) {
    let string = getHidByElement(element);
    let parent = element;
    
    while (parent.parentNode && parent.parentNode.nodeName !== 'HTML') {
        parent = parent.parentNode;
        string += '~' + getHidByElement(parent);
    }
    
    return string.split('~').reverse().join('~').toLowerCase();
}

/**
 * Remove all elements childs by className
 * 
 * @private
 * 
 * @param {HTMLElement} cleaner         Parent DOM element
 * @param {String} class_name           Deleting class name
 * @returns {none}                      No return
 */
function deleteAllChildByClass (cleaner, class_name) {
    
}

/**
 * Positions an element to display it inside the screen
 * 
 * @private
 * 
 * @param {HTMLElement} element         Display element
 * @returns {none}                      No return
 */
function putElementToScreen (element = null) {
    let scroll = getPageScroll(),
        el = element || record.link,
        scroll_size = scrollbarWidth();

    if (el.offsetLeft < 0) {
        el.style.left = 5 + 'px';
    }
    
    if (el.offsetTop < 0) {
        el.style.top = 5 + 'px';
    }
    
    if (el.offsetLeft + el.offsetWidth + 18 > scroll.x + record.screenWidth) {
        el.style.left = (scroll.x + record.screenWidth - el.offsetWidth - scroll_size - 5) + 'px';
    }
    
    if (el.offsetTop + el.offsetHeight > scroll.y + record.screenHeight) {
        el.style.top = (scroll.y + record.screenHeight - el.offsetHeight - scroll_size - 5) + 'px';
    }
}

/**
 * Calculate scroll line width
 * 
 * @private
 * 
 * @returns {integer}                  Width scroll lines
 */
function scrollbarWidth () {
    let documentWidth = parseInt(document.documentElement.clientWidth),
        windowsWidth = parseInt(window.innerWidth),
        scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
}

/* // !
TODO:
1. При наличии нескольких подклассов у элемента, нужно будет давать пользователю возможность выбирать, по какому имени класса будет осуществляться проверка или действие
2. 

 */