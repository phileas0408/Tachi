import db from "external/mongo/db";
import { integer, NotificationBody, NotificationDocument } from "tachi-common";
import { Random20Hex } from "utils/misc";

function ConstructNotificationDoc(
	title: string,
	toUserID: integer,
	body: NotificationBody
): NotificationDocument {
	return {
		title,
		sentTo: toUserID,
		read: false,
		sentAt: Date.now(),
		notifID: `N${Random20Hex()}`,
		body,
	};
}

/**
 * Send a notification to a user.
 *
 * @param title - A human friendly title for this notification.
 * @param toUserID - The user to send the notification to.
 * @param body - The body of the notification.
 */
export function SendNotification(title: string, toUserID: integer, body: NotificationBody) {
	const notification = ConstructNotificationDoc(title, toUserID, body);

	return db.notifications.insert(notification);
}

/**
 * Send notifications to multiple users at once. This is more efficient than calling
 * send notification in parallel.
 */
export function BulkSendNotification(title: string, toUserIDs: integer[], body: NotificationBody) {
	const notifications = toUserIDs.map((e) => ConstructNotificationDoc(title, e, body));

	return db.notifications.insert(notifications);
}

/**
 * Mark a notification as read. This is notably different to deleting a notification,
 * and is typically done when the user acknowledges the existence of the notification.
 */
export function ReadNotification(notifID: string) {
	return db.notifications.update(
		{ notifID },
		{
			$set: { read: true },
		}
	);
}

/**
 * Mark all of a user's notifications as read.
 */
export function ReadUsersNotifications(userID: integer) {
	return db.notifications.update(
		{ sentTo: userID },
		{
			$set: { read: true },
		},
		{ multi: true }
	);
}

export function DeleteNotification(notifID: string) {
	return db.notifications.remove({ notifID });
}
