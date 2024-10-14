/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    fontFamily: {
      'estedad-bold' : 'estedad bold',
      'estedad-medium' : 'estedad medium',
      'estedad-regular' : 'estedad regular',
    },
    colors:{
      'white' : "#FFFFFF",
      'gray-1' : '#F9F9F9',
      'gray-2' : '#E1E1E1',
      'gray-3' : '#EDEDED',
      'gray-4' : '#CBCBCB',
      'gray-5' : '#ADADAD',
      'gray-6' : '#757575',
      'gray-7' : '#717171',
      'gray-8' : '#353535',
      'black' : '#0C0C0C',
    },
    extend: {
      colors : {
        'primary' : '#417F56',
        'tint-1' : '#E5F2E9',
        'tint-2' : '#CAE4D3',
        'tint-3' : '#B0D7BD',
        'tint-4' : '#96C9A7',
        'tint-5' : '#7CBC91',
        'tint-6' : '#61AE7B',
        'tint-7' : '#4E9968',
        'shade-1' : '#396F4B',
        'shade-2' : '#315F41',
        'shade-3' : '#294F36',
        'shade-4' : '#21402B',
        'shade-5' : '#183020',
        'shade-6' : '#102016',
        'shade-7' : '#08100B',       
        'error' : '#C30000',       
        'error-light' : '#ED2E2E',       
        'error-extraLight' : '#FFF2F2',       
        'success' : '#00966D',       
        'success-light' : '#00BA88',       
        'success-extraLight' : '#F3FDFA',       
        'warning' : '#A9791C',       
        'warning-light' : '#F4B740',       
        'warning-extraLight' : '#FFF8E1',       
      },
      fontSize : {
        '2xs' : '0.5rem'
      },
      
    },
  },
  plugins: [
    function ({ addVariant }){
      addVariant('child' , '&>*');
      addVariant('child-hover' , '&>*:hover');
    }
  ],
}

