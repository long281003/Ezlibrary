export const getEmployee = (state) => {
    return state.employees
}
export const getSelected = (state) => {
    return state.selectedEmployee
}
export const getMember = (state) => {
    return state.members
}
export const isAuthenticated = (state) => {
    return state.token
}
export const getMemberShip = (state) => {
    return state.memberShip
}
export const getMemberShipId = (state) => {
    return state.memberShipId
}
export const getBook = (state) => {
    return state.books
}
export const getBookId = (state) => {
    return state.bookId
}
export const getTransaction = (state) => {
    return state.transactionList
}
export const getSearchBook = (state) => {
    return state.searchBooks
}
export const getTag = (state) => {
    return state.tags
}
export const getLoan = (state) => {
    return state.BookLoan
}
export const getTagId = (state) => {
    return state.tagId
}
export const getSearchTagBook = (state) => {
    return state.searchTagBooks
}
export const isAuthModalVisible = (state) => {
    return state.showAuthModal
}