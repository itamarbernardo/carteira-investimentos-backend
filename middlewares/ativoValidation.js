const { body } = require("express-validator");

const ativoInsertValidation = () => {
  return [
    body("codigo")
      .not().equals("undefined").withMessage("O código do ativo é obrigatório") //O formato aqui é formdata (não json), por isso a forma de verificar é diff
      .isString().withMessage("O código do ativo é obrigatório")
      .isLength({ min: 5, max: 6 }).withMessage("O código precisa ter no mínimo 5 e no máximo 6 caracteres."),
  ]
}

const ativoUpdateValidation = () => {
  return [
    body("codigo")
      .optional()
      .isString().withMessage("O código do ativo é obrigatório")
      .isLength({ min: 5, max: 6 }).withMessage("O código do ativo precisa ter no mínimo 5 e no máximo 6 caracteres."),
  ];
};

module.exports = {
    ativoInsertValidation, 
    ativoUpdateValidation,  
}