import axios from "axios";
import { useEffect, useState } from "react";
import { Button, CardFooter, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
const initialValue = {
    ad: "",
    soyad:"",
    email: "",
    password: "",
}

export default function Register () {
    const [formData, setFormData] = useState(initialValue);
    const [errors, setErrors] = useState({
        ad: false,
        soyad:false,
        email: false,
        password: false,
    })
    const errorMessages = {
        ad: "adınızı en az 3 karakter giriniz",
        soyad:"soyadınızı en az 3 karakter giriniz",
        email: "Geçerli bir email giriniz",
        password: "en az 8 karakter, büyük harf, küçük harf, sembol ve rakam içermelidir",
    }
    // commit deneme
    //commit deneme2
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

      
    const [isValid, setIsValid] = useState(false);
    const [id, setId] = useState("")


    useEffect(() => {
        if(formData.ad.trim().length >=3 && 
        formData.soyad.trim().length >=3 && 
        validateEmail(formData.email) && 
        regex.test(formData.password)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }

        }, [formData])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})

        if(name=="ad" || name=="soyad") {
            if(value.trim().length >= 3) {
                setErrors({...errors, [name]: false})
            } else {
                setErrors({...errors, [name]: true})
            }
        }
        if(name=="email") {
            if(validateEmail(value)){ 
                setErrors({...errors, [name]: false})
            } else { 
                setErrors({...errors, [name]: true})
            } 
        }

        if(name=="password") {
        if (regex.test(value)) {
             setErrors({...errors, [name]: false})
        } else {
            setErrors({...errors, [name]: true})
        }
        }
    }
    const handleSubmit = event => {
        event.preventDefault();
        if(!isValid) return;
        axios.post('https://reqres.in/api/users', formData)
  .then(function (response) {
    // handle success
    setId(response.data.id)
    setFormData(initialValue)
  })
  .catch(function (error) {
    // handle error
    console.warn(error);
  })
    }
    return (
        <>
        <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="ad">
      Ad:
    </Label>
    <Input
      id="ad"
      name="ad"
      placeholder="adınızı girin"
      type="text"
      onChange={handleChange}
      value={formData.ad}
      invalid={errors.ad}
      data-cy="ad"
    />
    {errors.ad && <FormFeedback data-cy="error-ad"> {errorMessages.ad} </FormFeedback>}
      
    
  </FormGroup>
  <FormGroup>
    <Label for="soyad">
      Soyad:
    </Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı giriniz"
      type="text"
      onChange={handleChange}
      value={formData.soyad}
      invalid={errors.soyad}
      data-cy="soyad"
    />
    {errors.soyad && <FormFeedback data-cy="error-syoad"> {errorMessages.soyad} </FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="email">
      Email
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="with a placeholder"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
      data-cy="email"
    />
    {errors.email && <FormFeedback data-cy="error-email"> {errorMessages.email} </FormFeedback>}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="password placeholder"
      type="password"
      onChange={handleChange}
      value={formData.password}
      invalid={errors.password}
      data-cy="password"
    />
    {errors.password && <FormFeedback data-cy="error-password"> {errorMessages.password} </FormFeedback>}
  </FormGroup>
  
  <Button data-cy="button" disabled={!isValid}>
    Kayıt ol
  </Button>
  {id &&  <CardFooter data-cy="result_id"> ID: {id}</CardFooter>}
    

</Form>
        </>
    )
}