@Component({
    components: {
        ElButton,
    },
    methods: {
        ...mapActions(['updateUserSetting']),
    },
    computed: {
        ...mapGetters(['userSetting']),
    },
})
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  get name(): string {
    return this.firstName + ' ' + this.lastName
  }

  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
  
  mounted() {
	console.log("mounted")
  }
  
  changeName() {
    this.firstName = 'Leo'
    this.lastName = 'Messi'
  }
  
  render() {
    return <ElButton>{this.name}</ElButton>
  }
}