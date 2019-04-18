Atouch
    .config({no_gui: true})
    .collect('VideoCheck',
        Atouch.async(
            Atouch
                .exists({id: 'mouse_test'})
        )
    )
    .collect('MasterLogin20',
        Atouch.click({class: 'menu_button', index: 1})
            .use('VideoCheck')
    )
    .collect('ListenersLogin10',
        Atouch.click({class: 'menu_button', index: 0})
            .use('VideoCheck')
    )
    .prepare(
        Atouch.Test
            .name('test_htmlcheck')
            .chain(
                Atouch.sync(
                    Atouch.print({name: 'user_login', index: 0, input: 'Master'})
                        .use('MasterLogin20')
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