function errorsReducer(errors) {
  if (typeof errors === "string") return { message: errors };
  const result = {};

  for (let field in errors) {
    result[errors[field].path] = errors[field].message;
  }
  return result;
}

module.exports = { errorsReducer };
