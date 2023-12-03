import React from 'react'
import Swal from 'sweetalert2'

const SuccessAlert = (title, text) => {

    Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000
    })
}

export default SuccessAlert