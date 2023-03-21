import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = ''}) => {
  console.log(pages)
  return pages > 1 && (
    <Pagination>
      {Array.from({ length: pages }, (v, i) => i+1).map(x => (
        <LinkContainer key={x+1} to={
          !isAdmin ? keyword ? `/search/${keyword}/page/${x}` : `/page/${x}` : `/admin/productlist/page/${x}`
          }>
          <Pagination.Item active={x === page}>{x}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate