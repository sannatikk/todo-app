const emptyOrRows = (result) => {   // helper function to return an empty array if no rows are returned
    if (!result) return []          // if no result, return an empty array
    return result.rows              // otherwise return the rows
}

export { emptyOrRows }