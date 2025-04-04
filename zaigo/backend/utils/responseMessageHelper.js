const responseMessageHelper = {
  response: {
    fetchedSuccessfully: "Fetched Successfully",
    createdSuccessfully: "Created Successfully",
    updatedSuccessfully: "Updated Successfully",
    deletedSuccessfully: "Deleted Successfully",
    noDataFound: "No Data Found",
    duplicateData: "This data is Already Exists",
    internalError: "internal Error",
    invalidData: "Invalid Data"
  },
  fetchedSuccessfully: (data) => {
    return `${data}, ${responseMessageHelper.response.fetchedSuccessfully}`
  },
  createdSuccessfully: (data) => {
    return `${data}, ${responseMessageHelper.response.createdSuccessfully}`
  },
  updatedSuccessfully: (data) => {
    return `${data}, ${responseMessageHelper.response.updatedSuccessfully}`
  },
  deletedSuccessfully: (data) => {
    return `${data}, ${responseMessageHelper.response.deletedSuccessfully}`
  },
  noDataFound: () => {
    return `${responseMessageHelper.response.noDataFound}`
  },
  duplicateData: (data) => {
    return `${data}, ${responseMessageHelper.response.duplicateData}`
  },
  internalError: () => {
    return `${responseMessageHelper.response.internalError}`
  },
  invalidData: () => {
    return `${responseMessageHelper.response.invalidData}`
  },
}

export const {
  fetchedSuccessfully,
  createdSuccessfully,
  updatedSuccessfully,
  deletedSuccessfully,
  noDataFound,
  duplicateData,
  internalError,
  invalidData
} = responseMessageHelper;