atouch
    .config({no_gui: true})
    .collect('VideoCheck',
        atouch.async(
            atouch.jscheck({vars: 'myObj.option.5', equal: 'test'})
                .jscheck({vars: 'myArr[2]', equal: 31})
                .exists({id: 'mouse_test'})
        )
    )
    .collect('MasterLogin20',
        atouch.click({class: 'menu_button', index: 1})
            .while(
                atouch.csscheck({name: 'user_phone', index: 0, style: {'resize': 'none'}})
            )
            .use('VideoCheck')
    )
    .collect('ListenersLogin10',
        atouch.click({class: 'menu_button', index: 0})
            .wait(10)
            .use('VideoCheck')
    )
    .prepare(
        atouch.test
            .name('test_htmlcheck')
            .chain(
                atouch.sync(
                    atouch.print({name: 'user_login', index: 0, input: 'Master'})
                        .use('MasterLogin20')
                        .wait(20)
                        .click({class: 'menu_button', index: 0})
                )
            )
    )
    .prepare(
        atouch.test
            .id('User1Login')
            .name('test_htmlcheck1')
            .desc('Short html checking')
            .chain(
                atouch.sync(
                    atouch.print({name: 'user_login', index: 0, input: 'User1'})
                        .use('VideoListenersLogin10')
                )
            )
    )
    .run(
        atouch.async(
            atouch
                .page()
                .page('file:///D:/work/project/atouch/library/build/index.html' + '?p=0', 'MasterLogin20')
                .page('file:///D:/work/project/atouch/library/build/index.html' + '?p=1', 'User1Login')
        )
    );