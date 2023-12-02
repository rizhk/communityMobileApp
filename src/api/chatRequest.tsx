import { fetchAxiosAPI } from "./request";

async function fetchMyChannelUsers(id: number, userToken?: string | null): Promise<any> {
  return await fetchAxiosAPI(`/channel-users/me`, userToken);
}

async function fetchMessages(
  channelId: number,
  latestId: number,
  count: number,
  userToken?: string | null
): Promise<any> {
  try {
    const res = await fetchAxiosAPI(`/messages/fromChannel/${channelId}/${latestId}/${count}`, userToken);
    return res;
  } catch (err) {
    console.error(err, "Messages fetching qs error");
  }
}

export { fetchMyChannelUsers, fetchMessages };
