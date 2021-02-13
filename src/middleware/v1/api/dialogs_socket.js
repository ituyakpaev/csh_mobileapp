export default () => {
    let catchWs = () => {

        let data = {};

        try {
            data = JSON.parse(e);
            console.info(data);
        } catch (err) {
            console.info(err);
            console.info(e);
        }

        this.$eventHub.$emit('ws-onmessage', {
            data,
            user: this.user
        });

        if (data.signals && data.signals.length) {
            data.signals.forEach(item => {
                switch (item.object) {
                    case 'nav_dialogs':
                        if (this.user.curator && item.data.menu && item.data.menu.length) {
                            item.data.menu.forEach(menu => {
                                this.$store.commit('base/SET_LOCAL_NAV_COUNT', {
                                    name: 'dialogs',
                                    id: menu.id,
                                    count: menu.count
                                });
                            })
                        }
                        break;
                    case 'dialog_menu':
                        if (item.data.chat && item.data.chat.id) {

                            if (this.user.curator) {
                                this.$store.commit('dialogs/SET_MENU_COUNT', {
                                    id: item.data.chat.id,
                                    count: item.data.chat.count,
                                    text: item.data.chat.text,
                                    date: item.data.chat.date,
                                });
                            } else {
                                this.$store.commit('base/SET_LOCAL_NAV_COUNT', {
                                    name: 'dialogs',
                                    id: item.data.chat.id,
                                    count: item.data.chat.count
                                });
                            }

                        }
                        break;
                    case 'message':
                        console.info(item.data);
                        if (item.data.action === 'remove') {
                            this.$store.commit('dialogs/REMOVE_POST', item.data.id);
                        } else if (item.data.action === 'restore') {
                            this.$store.commit('dialogs/RESTORE_POST', item.data.id);
                        }
                        break;
                    default:
                        break;
                }
            })
        }

    }
}
