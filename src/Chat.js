import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
import { useHistory } from "react-router-dom";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const open = () => {
		if (!read) {
			dispatch(selectImage(imageUrl));
			db.collection("post").doc(id).set(
				{
					read: true,
				},
				{ merge: true }
			);
			history.push("/chats/view");
		}
	};

	return (
		<div onClick={open} className="chat">
			<Avatar className="chat_avatar" src={profilePic} />
			<div className="chat_info">
				<h4>{username}</h4>
				<p>
					Tap to view -{" "}
					<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
				</p>
			</div>
			{!read && <StopRoundedIcon className="chat_readIcon" />}
		</div>
	);
}

export default Chat;
