const handleInputChange = (field, value, data, setData) => {
    setData({...data, [field]: value})
}

const selectItem = (value, key, data, setData) => {
    setData({...data, [key]: value})  
}

const generateSubtitle = (item, translate) => {
    const formattedStartDate = new Date(item.start_date).toLocaleString();
    return item.observation ? (`${item.observation.slice(0,25)} - ${translate('data-hour-start')}: ${formattedStartDate}`) : null;
}

const getTitle = (action_type) => {
    switch(action_type) {
        case "1":
        return "sleep";

        case "2":
        return "eat";

        case "3":
        return "diaper";

        default:
        return "eat";
    }
}

const validateDiaper = (data,translate) => {
    const errors = [];
    const requiredFields = ["action_type", "start_date", "type", "observation"];
  
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors.push(translate(field));
      }
    });
  
    return errors;
}

const validateSleep = (data, translate) => {
    const errors = [];
    
    const requiredFields = ["action_type", "start_date", "end_date", "observation"];
  
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors.push(translate(field));
      }
    });
  
    return errors;
}

const validateEat = (data, translate) => {
    const errors = [];
    const requiredFields = ["action_type", "start_date", "type", "observation"];
  
    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors.push(translate(field));
      }
    });
  
    return errors;
}

const validateFields = (data, actionType, translate) => {
    switch(actionType) {
        case "1":
        return validateSleep(data, translate);

        case "2":
        return validateEat(data, translate);

        case "3":
        return validateDiaper(data, translate);

        default:
        return validateEat(data, translate);
    }
}

export {
    handleInputChange,
    generateSubtitle,
    getTitle,
    selectItem,
    validateFields
}