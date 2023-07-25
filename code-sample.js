/* For setting form fields */
const [formData, setFormData] = useState({ email: '', password: '' })

const onChange = (evt) => {
  setFormData((prevState) => ({
    ...prevState,
    [evt.target.id]: evt.target.value,
  }))
}
