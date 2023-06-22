import "./styles.css";

import { useEffect, useState, useCallback } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/posts/index";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput/index";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState("");

  const handleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    console.log(new Date().toLocaleString("pt-br"));
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
        <i className="bx bx-search-alt-2"></i>
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Posts not found!</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load More Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
export default Home;

// classess !!!!!---------------------------------------------------------------------------------------------
// neste caso o estado prévio é muito importante por que ele pode mudar e mudar
// a forma com que é trabalhado d exibido no console e na pag exemplo: console "0"  / pa "1"
//

// import { Component } from "react";
// export class Home extends Component {
//   state = {
//     counter: 0,
//   };
//   handleClick = () => {
//     this.setState(
//       (prevState, prevPorps) => {
//         return { counter: prevState.counter + prevPorps.numberToIncrement };
//       },
//       () => {
//         console.log("Post", this.state.counter);
//       }
//     );
//   };
//   render() {
//     return (
//       <div className="container">
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Increment</button>
//       </div>
//     );
//   }
// }
// export default Home;
