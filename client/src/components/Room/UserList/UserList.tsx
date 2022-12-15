import { AiOutlineUser } from 'react-icons/ai'
import { TUser } from '../../../types/UserTypes'

type UserListProps = {
    users: TUser[]
}

export default function UserList({ users }: UserListProps) {
    <div className="container user">
        <h2>Users</h2>
        <ul className='list user'>
            {users.map(({ userId, userName }) => <li key={userId} className='item user'>
                <AiOutlineUser className='icon user' />
                {userName}
            </li>)}
        </ul>
    </div>
}