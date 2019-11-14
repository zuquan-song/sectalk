window.app = {
	
	nettyServerUrl: 'ws://localhost:8088/ws',
	serverUrl: 'http://localhost:8080',
	imgServerUrl: 'http://localhost:88/imooc/',
	
	isNotNull: function(str) {
		if (str != null && str != "" && str != undefined) {
			return true;
		}
		return false;
	},
	
	/**
	 * @param {Object} msg
	 * @param {Object} type
	 */
	showToast: function(msg, type) {
		plus.nativeUI.toast(msg, 
			{icon: "image/" + type + ".png", verticalAlign: "center"})
	},
	
	/**
	 * store User Object information
	 * @param {Object} user
	 */
	setUserGlobalInfo: function(user) {
		var userInfoStr = JSON.stringify(user);
		plus.storage.setItem("userInfo", userInfoStr);
	},
	
	/**
	 * get User Object information
	 */
	getUserGlobalInfo: function() {
		var userInfoStr = plus.storage.getItem("userInfo");
		return JSON.parse(userInfoStr);
	},
	
	/**
	 * when user logout, remove the Item
	 */
	userLogout: function() {
		plus.storage.removeItem("userInfo");
	},
	
	/**
	 * store contact information
	 * @param {Object} contactList
	 */
	setContactList: function(contactList) {
		var contactListStr = JSON.stringify(contactList);
		plus.storage.setItem("contactList", contactListStr);
	},
	
	/**
	 * get contactList from local cache
	 */
	getContactList: function() {
		var contactListStr = plus.storage.getItem("contactList");
		
		if (!this.isNotNull(contactListStr)) {
			return [];
		}
		
		return JSON.parse(contactListStr);
	},
	
	/**
	 * get contactList from cache by id
	 * @param {Object} friendId
	 */
	getFriendFromContactList: function(friendId) {
		var contactListStr = plus.storage.getItem("contactList");
		
		// 判断contactListStr是否为空
		if (this.isNotNull(contactListStr)) {
			// 不为空，则把用户信息返回
			var contactList = JSON.parse(contactListStr);
			for (var i = 0 ; i < contactList.length ; i ++) {
				var friend = contactList[i];
				if (friend.friendUserId == friendId) {
					return friend;
					break;
				}
			}
		} else {
			// 如果为空，直接返回null
			return null;
		}
	},
	
	/**
	 * store user chat history
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} flag	
	 */
	saveUserChatHistory: function(myId, friendId, msg, flag) {
		var me = this;
		var chatKey = "chat-" + myId + "-" + friendId;
		
		var chatHistoryListStr = plus.storage.getItem(chatKey);
		var chatHistoryList;
		if (me.isNotNull(chatHistoryListStr)) {
			chatHistoryList = JSON.parse(chatHistoryListStr);
		} else {
			chatHistoryList = [];
		}
		
		var singleMsg = new me.ChatHistory(myId, friendId, msg, flag);
		
		chatHistoryList.push(singleMsg);
		
		plus.storage.setItem(chatKey, JSON.stringify(chatHistoryList));
	},
	
	/**
	 * @param {Object} myId
	 * @param {Object} friendId
	 */
	getUserChatHistory: function(myId, friendId) {
		var me = this;
		var chatKey = "chat-" + myId + "-" + friendId;
		var chatHistoryListStr = plus.storage.getItem(chatKey);
		var chatHistoryList;
		if (me.isNotNull(chatHistoryListStr)) {
			chatHistoryList = JSON.parse(chatHistoryListStr);
		} else {
			chatHistoryList = [];
		}
		
		return chatHistoryList;
	},
	
	deleteUserChatHistory: function(myId, friendId) {
		var chatKey = "chat-" + myId + "-" + friendId;
		plus.storage.removeItem(chatKey);
	},
	
	/**
	 * save the last message of chat history
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} isRead
	 */
	saveUserChatSnapshot: function(myId, friendId, msg, isRead) {
		var me = this;
		var chatKey = "chat-snapshot" + myId;
		
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			for (var i = 0 ; i < chatSnapshotList.length ; i ++) {
				if (chatSnapshotList[i].friendId == friendId) {
					chatSnapshotList.splice(i, 1);
					break;
				}
			}
		} else {
			chatSnapshotList = [];
		}
		
		var singleMsg = new me.ChatSnapshot(myId, friendId, msg, isRead);
		chatSnapshotList.unshift(singleMsg);
		
		plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
	},
	
	getUserChatSnapshot: function(myId) {
		var me = this;
		var chatKey = "chat-snapshot" + myId;
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
		} else {
			chatSnapshotList = [];
		}
		
		return chatSnapshotList;
	},
	
	/**
	 * @param {Object} myId
	 * @param {Object} friendId
	 */
	deleteUserChatSnapshot: function(myId, friendId) {
		var me = this;
		var chatKey = "chat-snapshot" + myId;
		
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			for (var i = 0 ; i < chatSnapshotList.length ; i ++) {
				if (chatSnapshotList[i].friendId == friendId) {
					chatSnapshotList.splice(i, 1);
					break;
				}
			}
		} else {
			return;
		}
		
		plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
	},
	
	/**
	 * @param {Object} myId
	 * @param {Object} friendId
	 */
	readUserChatSnapshot: function(myId, friendId) {
		var me = this;
		var chatKey = "chat-snapshot" + myId;
		var chatSnapshotListStr = plus.storage.getItem(chatKey);
		var chatSnapshotList;
		if (me.isNotNull(chatSnapshotListStr)) {
			chatSnapshotList = JSON.parse(chatSnapshotListStr);
			for (var i = 0 ; i < chatSnapshotList.length ; i ++) {
				var item = chatSnapshotList[i];
				if (item.friendId == friendId) {
					item.isRead = true;	
					chatSnapshotList.splice(i, 1, item);	
					break;
				}
			}
			plus.storage.setItem(chatKey, JSON.stringify(chatSnapshotList));
		} else {
			return;
		}
	},


	CONNECT: 1, 	
	CHAT: 2, 	
	SIGNED: 3, 		
	KEEPALIVE: 4, 	
	PULL_FRIEND:5,	
	
	/**
	 * @param {Object} senderId
	 * @param {Object} receiverId
	 * @param {Object} msg
	 * @param {Object} msgId
	 */
	ChatMsg: function(senderId, receiverId, msg, msgId){
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.msg = msg;
		this.msgId = msgId;
	},
	
	/**
	 * @param {Object} action
	 * @param {Object} chatMsg
	 * @param {Object} extand
	 */
	DataContent: function(action, chatMsg, extand){
		this.action = action;
		this.chatMsg = chatMsg;
		this.extand = extand;
	},
	
	/**
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} flag
	 */
	ChatHistory: function(myId, friendId, msg, flag){
		this.myId = myId;
		this.friendId = friendId;
		this.msg = msg;
		this.flag = flag;
	},
	
	/**
	 * @param {Object} myId
	 * @param {Object} friendId
	 * @param {Object} msg
	 * @param {Object} isRead	
	 */
	ChatSnapshot: function(myId, friendId, msg, isRead){
		this.myId = myId;
		this.friendId = friendId;
		this.msg = msg;
		this.isRead = isRead;
	}
	
}
