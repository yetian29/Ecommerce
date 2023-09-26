import Navbar from '../navigations/Navbar'
import Footer from '../navigations/Footer'
import { check_account, load_user, refresh } from '../redux/actions/auth'
import { useEffect } from 'react'
import { connect } from 'react-redux'

function Layout(props) {
  useEffect(() => {
    // Gọi lần lượt các action creator theo thứ tự
    props.check_account()
      .then(() => {
        // Sau khi check_account hoàn thành, gọi load_user
        return props.load_user();
      })
      .then(() => {
        // Sau khi load_user hoàn thành, gọi refresh
        return props.refresh();
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}

export default connect(null, {
  load_user,
  check_account,
  refresh,
})(Layout);
