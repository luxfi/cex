import { createShallow } from '@material-ui/core/test-utils'
import toJson from 'enzyme-to-json'
import AccountSection from '../AccountSection'

const props = {
  title: 'Account Title',
  children: <div>this is a child</div>,
  style: {},
}

describe('Account Section', () => {
  let shallow
  beforeEach(() => {
    shallow = createShallow()
  })

  it('renders', () => {
    const wrapper = shallow(<AccountSection {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
