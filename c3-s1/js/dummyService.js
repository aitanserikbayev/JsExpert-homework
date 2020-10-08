function DummyService () {
  this.setLogAndPass = (access) => {
    localStorage.setItem('access', JSON.stringify(access))
  }
}