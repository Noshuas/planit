const copyInviteLink = (id) =>
// This fix is needed because we are currently useing http which doesn't
// support the clipboard-write permission;

  // to do: create a floating pill notification saying "'[link]' copied to the clipboard";
  // this way we can copy from that rather than creating an element for a fraction of a second.
  (() => {
    const inviteLink = `http://localhost:3000/invite-page/${id}`;
    const link = document.createElement('input');
    document.body.appendChild(link);
    link.value = inviteLink;
    link.select();
    document.execCommand('copy');
    link.remove();
  });
export default copyInviteLink;
