Atouch
    .config({no_gui: true})
    .collect('VideoCheck',
        Atouch.async(
            Atouch.jscheck({vars: 'myObj.option.5', equal: 'test'})
                .jscheck({vars: 'myArr[2]', equal: 31})
                .exists({id: 'mouse_test'})
        )
    )
    .collect('MasterLogin20',
        Atouch.click({class: 'menu_button', index: 1})
            .while(
                Atouch.csscheck({name: 'user_phone', index: 0, has: {'resize': 'none'}})
            )
            .use('VideoCheck')
    )
    .collect('ListenersLogin10',
        Atouch.click({class: 'menu_button', index: 0})
            .wait(10)
            .use('VideoCheck')
    )
    .prepare(
        Atouch.Test
            .name('test_htmlcheck')
            .chain(
                Atouch.sync(
                    Atouch.print({name: 'user_login', index: 0, input: 'Master'})
                        .use('MasterLogin20')
                        .wait(20)
                        .click({class: 'menu_button', index: 0})
                )
            )
    )
    .prepare(
        Atouch.Test
            .id('User1Login')
            .name('test_htmlcheck1')
            .desc('Short html checking')
            .chain(
                Atouch.sync(
                    Atouch.print({name: 'user_login', index: 0, input: 'User1'})
                        .use('VideoListenersLogin10')
                )
            )
    )
    .run(
        Atouch.async(
            Atouch
                .tab()
                .tab('file:///D:/work/project/Atouch/library/build/index.html' + '?p=0', 'MasterLogin20')
                .tab('file:///D:/work/project/Atouch/library/build/index.html' + '?p=1', 'User1Login')
        )
    );