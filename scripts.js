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
		game.settings.register('sbdtoolkit', 'selection', {
			name: "선택 범위 지정",
			hint: "토큰을 변경했을 때 커서의 상태를 설정합니다. 활성화하면 따옴표를 제외한 모든 문장을 선택하여, 즉시 수정 가능한 상태가 됩니다. 비활성화하면 커서가 따옴표를 제외한 문장 끝으로 가, 계속 작성 가능한 상태가 됩니다.",
			scope: 'client',
			config: true,
			type: Boolean,
			default: false
		});
		game.settings.register('sbdtoolkit', 'widechat', {
			name: "대두용 UI",
			hint: "채팅 헤더를 좌측에 몰아넣습니다. 다른 UI 모듈이나 커스텀 CSS 설정값에 따라 깨져보일 수 있습니다. 이름이 길어서 잘리는 건 책임 안 집니다.",
			scope: 'world',
			config: true,
			type: Boolean,
			default: false,
			onChange: value => window.location.reload()
		});
	}
}
Hooks.once('init', async function() {
	ModuleSettings.register();
	if (ModuleSettings.get('widechat')) {
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'modules/sbdtoolkit/chatstyle.css';
		link.media = 'all';
		head.appendChild(link);
	}
});

Hooks.on('controlToken', GoToChat)

function GoToChat() {
	if (!ModuleSettings.get('quickchat')) return;
	const chatmsg = document.getElementById('chat-message');
	
	document.querySelector('#sidebar-tabs>a').click();setTimeout(function() { 
		chatmsg.focus();
		if (canvas.tokens.controlled.length < 1) {
			if (chatmsg.value == "\"\"") {
				chatmsg.value = "";
			}
			let str = 0;
			let end = chatmsg.value.length;
		}
		else {
			if (chatmsg.value == "") {
				chatmsg.value = "\"\"";
			}
			let str = (ModuleSettings.get('selection')) ? 1 : chatmsg.value.length;
			let end = chatmsg.value.length - 1;
		}
		chatmsg.setSelectionRange(str, end);
	}, 10);
}