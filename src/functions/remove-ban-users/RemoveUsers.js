const RemoveUser = (id, setBanUsers, banUsers, ladyId) => {
    const updatedBanUsers = banUsers.filter((item) => item.id !== id);
    setBanUsers(updatedBanUsers);
    localStorage.setItem(`userBanIds-${ladyId}`, JSON.stringify(updatedBanUsers));
};

export default RemoveUser;
