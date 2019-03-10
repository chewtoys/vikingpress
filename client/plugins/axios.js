export default function ({ $axios }) {
  $axios.onRequest(config => {
    config.headers['X-VikingPress-Client'] = true
  })
}
