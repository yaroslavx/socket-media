import { USER_KEY } from '../../constants'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import storage from '../../utils/storage'

export const NameInput = () => {
    const [formData, setFormData] = useState({
        userName: "",
        roomId: 'main_room'
    })

    const [submitDisabled, setSubmitDisabled] = useState(true)
}