import React, { Component, useState } from 'react';
import { Link  } from "react-router-dom";
import { connect } from 'react-redux';
import './AboutUs.scss'
import visa from '../../../assets/images/visa.png'
import spx from '../../../assets/images/spx.png'
import QR from '../../../assets/images/qrcode.png'
import apple from '../../../assets/icon/apple.png'
import chplay from '../../../assets/icon/google-play.png'


class AboutUs extends Component {

    render() {
        return (
            <div className='about-us-section'>
                <div className='section-1'>
                    <h5>E-SHOPPING - EVERYTHING, BUY EVERYTHING AT E-SHOPPING</h5>
                    <p>E-Shopping - fun, reliable, safe and free online shopping app! E-Shopping is the leading online trading platform in Southeast Asia,
                         headquartered in Singapore, present throughout Singapore, Malaysia, Indonesia, Thailand, Philippines, Taiwan, Brazil, Mexico & Colombia.
                         With the guarantee of E-Shopping, you will shop online with peace of mind and faster than ever!</p>
                    <h5>SIMPLE, FAST AND SAFE ONLINE SHOPPING AND SELLING</h5>
                    <p>If you are looking for a website to buy and sell online, eShopping.vn is a great choice for you. E-Shopping is an e-commerce site that allows buyers and sellers to interact and easily exchange information about the shop's products and promotions.
                         Therefore, buying and selling on E-Shopping becomes faster and simpler. You can chat directly with the seller to ask directly about the item to buy. And if you want to buy genuine and reputable product lines, eShopping Mall is the ideal choice for you.
                          To make it easy for you to learn and use products, E-Shopping Blog - the official information blog of E-Shopping - will help you find out for yourself the knowledge about fashion trends, reviews. technology, beauty tips, consumer news and amazing deals.</p>

                    <p>Coming to E-Shopping, the opportunity to become a seller is easier than ever. With just a few taps on the app, you can immediately post your products for sale. Not only that, sellers can create their own promotions on E-Shopping to attract buyers with products with attractive prices.
                        When you log in at E-Shopping Seller Channel, you can easily categorize products, track orders, take care of customers and instantly update shop activities.</p>
                    <h5>DOWNLOAD E-Shopping APP NOW TO BUY AND SELL ONLINE ANYTIME, ANYWHERE</h5>
                    <p>The advantage of the E-shopping application is that it allows you to buy and sell goods anytime, anywhere. You can download the E-Shopping application as well as post sales products quickly and conveniently. In addition, the E-Shopping application also has the following advantages:</p>
                    <ul>
                        <li><p>Friendly interface, simple, easy to use. You will easily see the featured products as well as easily find the search box, shopping cart or instant chat feature.</p></li>
                        <li><p>The application integrates convenient purchase and sale order management technology on the same account. You will be both a buyer and a seller very flexible and easy.</p></li>
                        <li><p>Update promotion information, E-Shopping Flash Sale quickly and continuously.</p></li>
                    </ul>
                    <p>At E-Shopping, you can save E-Shopping discount codes, Xtra Vouchers and free nationwide shipping codes. Besides, E-Shopping will also have big promotion campaigns every year such as Sale 2.2, Sale 3.3, Sale 4.4, Sale 5.5, Sale 6.6, Sale 7.7, Sale 8.8, Sale 9.9, Sale 10.10, Sale 11.11, Sale 12.12 Birthday; New Year's Promotion, let's hunt for quality Tet gifts. This is the time for shoppers to quickly choose their favorite items at record-breaking prices.
                         In addition, you can also enjoy hunting sales on days of the month such as Sale in the middle of the month and Sale at the end of the month to receive your salary.</p>
                    <h5>BUY PREMIUM BRAND PRODUCTS AT GOOD PRICE AT E-Shopping</h5>
                    <p>Besides E-Shopping Premium, E-Shopping also has a lot of great promotions for brands with up to 50% off. In addition to the free shipping code, E-Shopping also has discount codes distributed each month from many of the genuine stores participating in this promotion. Besides, E-Shopping also gathers a lot of popular brands that are distributed by reputable retailers on E-Shopping, the top hot deal products for you to hunt for sale are updated every hour, every day, giving you the best shopping experience. Diverse selection, from top famous cosmetic brands such as Kiehl's, MAC, Foreo, SK-II, Estee Lauder,...
                         To famous technology brands such as: Gopro dash cam, Fuifilm camera, Hikvision webcam, Kindle e-reader,... At E-Shopping, you can easily find today's popular sports shoe brands such as: New Balance, Nike, Vans, Crocs,...</p>
                    <h5>BUY GENUINE PRODUCTS FROM BIG BRANDS WITH E-Shopping</h5>
                    <p>Shopping on E-Shopping is always an impressive experience. Whether you are in need of buying any men's fashion items, women's fashion, watches, phones, computers & laptops, etc., E-Shopping will also ensure to provide you with satisfactory products. Besides, E-Shopping also has the participation of the world's leading brands in various fields. Among them can be mentioned Samsung, OPPO, Xiaomi, Innisfree, Unilever, P&G, Biti's,...
                         These brands also now have official stores on E-Shopping Mall with hundreds of genuine and updated items. customary. As a reputable sales channel, E-Shopping is always committed to providing customers with cheap, safe and reliable online shopping experiences. All information about the seller and the buyer is absolutely confidential. Payment transactions at E-Shopping are always guaranteed to take place quickly and safely. Another issue that makes customers always interested is whether buying on E-Shopping is guaranteed.</p>
                    <p>E-Shopping always commits that all products on E-Shopping, especially E-Shopping Mall, are genuine products, full of labels and warranties from the seller. In addition, E-Shopping protects buyers and sellers by holding the transaction amount until the buyer confirms agreement with the order and there are no claims, returns or refunds. Payment will then be forwarded to the seller. Come to E-Shopping today to buy cheap online products and experience great customer service here. Especially when shopping on E-Shopping Mall, you will get free shipping, door to door delivery and 7 days free return. In addition, customers can use E-Shopping Coin to exchange for high value discount codes and attractive service vouchers.
                         Followed by E-Shopping Home Club, E-Shopping Mum Club, E-Shopping Beauty Club and E-Shopping Book Club with exclusive offers from big brands with registered customers. Visit E-Shopping Vietnam now or download the E-Shopping app to your phone today!</p>
                    <h5>TOP HIGHLIGHTS BRANDS</h5>
                    <p>Philips  |  Deerma  |  L'Oréal  | Kiehl's  |  Kappa  |  Juno  |  Converse  |  Biti's  |  Owen  |  Pedro  |  New Balance  |  adidas  |  Samsung  |  Sunhouse  |  Xiaomi  |  Oreo  |  Nike  |  Pantio  |  Supreme  |  PUMA  |  Kindle  |  DHC  |  Transino  |  Martiderm  |  Paula’s Choice  |  The Ordinary  |  KitKat  |  Teelab  |  SomeHow  |  Elise  |  YODY  |  Coolmate  |  MARC Fashion  |  Vergency |  Scott Platon  |  GUMAC  |  Vascara  |  MWC  |  Shondo  |  CANIFA  |  Sablanca  |  The Wolf  |  OLV Boutique  |  Pandora  |  Dottie  |  Skin Aqua</p>
                    <h5>TOP TRENDING KEYWORDS</h5>
                    <p>iPhone 14  |  điện thoại Samsung S23  | lưới chống muỗi | đèn bắt muỗi Rạng Đông |  chiếu điều hòa  | quạt hơi nước | quạt cây | quạt treo tường | quạt điều hòa  |  lưới an toàn ban công  |  Ender 3 V2  |  lego  |  kem chống nắng  |  kem chống nắng cho da dầu  |  kem chống nắng cho da dầu mụn  |  kem chống nắng vật lý  |  kem chống nắng cho da khô  |  kem chống nắng nâng tone  |  đèn năng lượng mặt trời  |  máy đo huyết áp Omron  |  gấu dâu Lotso  |  loa bluetooth  |  tai nghe bluetooth  |  máy hút bụi không dây   |  áo chống nắng  |  serum Kiehl's  |  truyện ngôn tình  | manga  |  My Hero Academia  |  Chainsaw Man  |  Chú Thuật Hồi Chiến  |  Kimetsu No Yaiba  |  Attack On Titan  |  One Piece</p>

                </div>
                <div className='section-2'>
                    <div className='title-aboutus'>
                        <h5>CATEGORIES</h5>
                    </div>
                    <div className='content-aboutus'>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                        <div className="grid-item"><Link to='/' className='content-link'>BOYS FASHION</Link></div>
                    </div>
                </div>
                <div className='section-3'>
                    <div className='section-3-1'>
                        <div className='title-aboutus'>
                            <h5>CUSTOMER CARE</h5>
                        </div>
                        <div className='content-aboutus'>
                            <div className="grid-item"><Link to='/' className='content-link'>Help Center</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>E-Shopping Blog</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>E-Shopping Mall</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Shopping guide</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Sales Guide</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Pay</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>E-Shopping coins</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Delivery</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>BReturns & Refunds</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Customer care</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Warranty Policy</Link></div>
                        </div>
                    </div>
                    <div className='section-3-2'>
                        <div className='title-aboutus'>
                            <h5>ABOUT E-SHOPPING</h5>
                        </div>
                        <div className='content-aboutus'>
                            <div className="grid-item"><Link to='/' className='content-link'>About E-Shopping Vietnam</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Recruitment</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>E-Shopping Terms</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Privacy Policy</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Genuine</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Seller Channel</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Flash Sales</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>E-Shopping Affiliate Program</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'>Contact Media</Link></div>
                        </div>
                    </div>
                    <div className='section-3-3'>
                        <div className='payment-section'>
                            <div className='title-aboutus'>
                                <h5>PAYMENT</h5>
                            </div>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                            <img src={visa} alt={'visa'}/>
                        </div>
                        <div className='delivery-section'>
                            <div className='title-aboutus'>
                                <h5>DELIVERY UNIT</h5>
                            </div>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                            <img src={spx} alt={'spx'}/>
                        </div>
                    </div>
                    <div className='section-3-4'>
                        <div className='title-aboutus'>
                            <h5>FOLLOWING US ON</h5>
                        </div>
                        <div className='content-aboutus'>
                            <div className="grid-item"><Link to='/' className='content-link'><i class="fab fa-facebook"></i>Facebook</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'><i class="fab fa-instagram"></i>Instagram</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'><i class="fab fa-twitter"></i>Twitter</Link></div>
                            <div className="grid-item"><Link to='/' className='content-link'><i class="fab fa-youtube"></i>Youtube</Link></div>
                        </div> 
                    </div>
                    <div className='section-3-5'>
                        <div className='title-aboutus'>
                            <h5>DOWNLOAD E-SHOPPING APP NOW</h5>
                        </div>
                        <div className='content-aboutus'>
                            <img src={QR} alt={'QR'}/>
                            <div className="button-download"><Link to='/' className='button-link-apple'><img src={apple} alt={'apple'}/>App Store</Link></div>
                            <div className="button-download"><Link to='/' className='button-link-google'><img src={chplay} alt={'chplay'}/>Google Play</Link></div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
