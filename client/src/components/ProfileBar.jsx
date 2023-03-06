import useAuth from "../hooks/useAuth";

function ProfileBar() {
    const { auth } = useAuth();
    return (
        <>
            <div className="flex-1 p-3">
                {!auth?.accessToken ? <h1>Welcome to DixieAzon</h1> : <h1>{`Welcome ${auth?.email}`}</h1>}
            </div>
        </>
    )
}

export default ProfileBar;