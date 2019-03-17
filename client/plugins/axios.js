export default function ({ $axios }) {
  $axios.onRequest(config => {
    config.headers['X-VikingPress-Client'] = true
  })
  $axios.defaults.validateStatus = function (status) {
    console.log('IT USED ME! IT USED ME AND I FEEL USED!')
    return true
    // return status >= 200 && status < 300; // default
  }
}
