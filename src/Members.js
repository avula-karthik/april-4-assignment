const Members = () => {
    if (localStorage.getItem('token').length > 2) {
        return <h1>LoggedIN</h1>;
    } else {
        return <h1>Invalid username/password</h1>;
    }
};
export default Members;
