import * as yup from 'yup'

export default yup.object().shape({
name: yup.string()
    .required('name is required')
    .min(3, 'recipe name must be 3 chars or longer'),
source: yup.string()
    .required('source is required')
    .min(3, 'source must be 3 chars or longer'),
ingredients: yup.string()
    .required('must list atleast 2 ingredients'),
time: yup.string()
    .required('time is required')
    .min(3, 'time must 3 chars or longer'),
instructions: yup.string()
    .required('instructions are required')
    .min(3, 'instructions must be 3 chars or longer'),
  
    breakfast: yup.boolean(),
    dinner: yup.boolean(),
   chicken: yup.boolean(),
   beef: yup.boolean(),
   pork: yup.boolean(),
   fish: yup.boolean(),
   vegetables: yup.boolean(),
   soup: yup.boolean(),
   dessert: yup.boolean(),
})
