class ModuleSettings {
	static get(key) {
		return game.settings.get('sbdtoolkit', key)
	}
	static register() {
		game.settings.register('sbdtoolkit', 'quickchat', {
			name: "빠른 대화 사용",
			hint: "활성화하면 토큰 선택 즉시 커서가 대화창으로 이동하고, 자동으로 큰따옴표가 입력됩니다.",
			scope: 'client',
			config: true,
			type: Boolean,
			default: false
		});
	}
}
Hooks.once('init', async function() {
	ModuleSettings.register();
});

Hooks.on('controlToken', GoToChat)

function GoToChat() {
	if (!ModuleSettings.get('quickchat')) return;
	const chatmsg = document.getElementById('chat-message');
	
	document.querySelector('#sidebar-tabs>a').click();setTimeout(function() { 
		chatmsg.focus();
		if (chatmsg.value == "") {
			chatmsg.value = "\"\"";
			chatmsg.setSelectionRange(1, 1);
		}
	}, 10);
}