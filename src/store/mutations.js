export const setEmployee = (state, employee) => {
    state.employees = employee || []
} 
export const update_Employ = (state, updatedEmployee) => {
   const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
        if (index !== -1) {
            state.employees.splice(index, 1, updatedEmployee);
        }
}
export const deleteEmployee = (state, id) => {
    state.employees = state.employees.filter(employee => employee.id !== id);
}
export const setSelectedEmployee = (state, employee) => {
    state.employees = employee
}
export const setMember = (state, member) => {
    state.members = member || {}
}
export const setemail = (state, email) => {
    state.email = email
}
export const setStatus = (state, otp) => {
    state.otpstatus = otp
}
export const setToken = (state, token) => {
    state.token = token
    sessionStorage.setItem('authtoken', token)
}
export const setMemberInfor = (state, memberInfor) => {
    state.members = memberInfor
}
export const updateMember = (state, updateMember) => {
    state.member = updateMember
}
export const setPassword = (state, password) => {
    state.newPassword = password
}
export const setMemberShip = (state, memberShip) => {
    state.memberShip = memberShip 
}
export const setMemberMemberShip = (state, memberMemberShip) => {
    state.memberMemberShip = memberMemberShip 
}
export const setMemberShipId = (state, membershipId) => {
    state.memberShipId = membershipId || null
}
export const setBook = (state, book) => {
    state.books = book
}
export const setBookId = (state, bookId) => {
    state.bookId = bookId || null
}
export const setSearchBook = (state, book) => {
    state.searchBooks = book || []
}
export const setTransaction = (state, transaction) => {
    state.transactionList = transaction || []
}
export const setAudio = (state, audio) => {
    state.audios = audio
}
export const setTag = (state, tag) => {
    state.tags = tag
}
export const setTagId = (state, tagid) => {
    state.tagId = tagid || null
}
export const setBookLoan = (state, loan) => {
    state.BookLoan = loan
}
export const setSearchTagBook = (state, tagBook) => {
    state.searchTagBooks = tagBook
}
export const SET_AUTH_MODAL = (state, paload) => {
    state.showAuthModal = paload;
}