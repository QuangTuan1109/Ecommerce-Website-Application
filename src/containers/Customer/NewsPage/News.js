import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import { connect } from "react-redux";

import HeaderHomepage from '../../HomePage/HeaderHomepage';

import AboutUs from '../../HomePage/Section/AboutUs'

import FooterHomepage from '../../HomePage/FooterHomepage';
import './News.scss';


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'all prices'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {

        return (
            <>
                <HeaderHomepage />
                <div className='news-page-container'>
                    <div className='news-page-title'>
                        <ul className='option'>
                            <li><span>Welcome everyone to E-Shopping</span></li>
                            <li><span>You can find good choices here.</span></li>
                            <li><span>Wish you have a good experience.</span></li>
                        </ul>
                    </div>
                    <div className='news-page-content'>
                        <div className='header-result-filter'>
                             <div className='block-tabs'>
                                <input type='radio' id='blog' name='mytabs' checked/>
                                <label className='tabs-button' for='blog'>BLOG</label>
                                <div className='content'>
                                    <div className='sorted-part'>
                                        <div className='btn-filter'><Link to='/' className='button'>All</Link></div>
                                        <div className='btn-filter'><Link to='/' className='button'>Following</Link></div>
                                        <div className='btn-filter'><Link to='/' className='button'>Suggest</Link></div>
                                        <div className='search-input'>
                                            <input type='text' 
                                            className='search-control' 
                                            placeholder='Searching...'
                                            value={this.state.username}
                                            onChange={(event) => this.handelOnchangeUsername(event)}
                                            />
                                        </div>
                                        <div className='search-button'>
                                            <button className='btn-search' onClick={() => this.handelOnClickButton()}>Search</button>
                                        </div>
                                    </div>
                                    <div className='show-news-card'>
                                    <div className='blog-card-latest'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <input type='radio' id='posts' name='mytabs' />
                                <label className='tabs-button' for='posts'>POSTS</label>
                                <div className='content'>
                                <div className='show-news-card'>
                                    <div className='blog-card-latest'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='blog-card'>
                                        <div className='blog-card-header'>
                                            <Link to='/' className='link-image-blog'>
                                                <div className='image-blog-card' />
                                            </Link>
                                        </div>
                                        <div className='blog-card-body'>
                                            <span className='tag tag-teal'>Technology</span>
                                            <Link to='/' className='link-title-blog'>Why is the Tesla Cybertruck designed the way it is?</Link>
                                            <p>An exploration into the truck's polarising design</p>
                                            <div className='author'>
                                                <Link to='/' className='link-image-author'>
                                                    <div className='avt-author' />
                                                </Link>
                                                <div className='news-info'>
                                                    <Link to='/' className='name-link'><h5>IU Shop</h5></Link>
                                                <small>2h ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                           
                            </div>
                            
                        </div>
                        <div className='footer-paging'>
                            <button className='prev-btn' disabled><i class="fa-sharp fa fa-backward"></i></button>
                            <div className='btn-paging'><Link to='/' className='button'>1</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>2</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>3</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>4</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>5</Link></div>
                            <div className='btn-paging'><Link to='/' className='button'>...</Link></div>
                            <button className='next-btn'><i class="fa-sharp fa fa-forward"></i></button>
                        </div>
                    </div>
                </div>
                <AboutUs />
                <FooterHomepage />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
