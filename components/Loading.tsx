import React from "react"

// export default loading => loading && <img src="/static/img/spinner.gif" alt="" className="spinner" />
function loading(status) {
  return status && <img src="/static/img/spinner.gif" alt="" className="spinner" />
}
export default loading
