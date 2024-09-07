import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div>
            <div className="px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
               <div className="border border-1 border-light my-2" style={{width:"30px"}} ></div> 
               <div className="border border-1 border-light my-2" style={{width:"30px"}} ></div> 
               <div className="border border-1 border-light my-2" style={{width:"30px"}} ></div> 
            </div>

            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Links</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <Link to={"/Home"} className="text-decoration-none text-light text-start btn col-12 bg-dark my-3">Home</Link>
                  <Link to={"/Create-post"} className="text-decoration-none text-light text-start btn col-12 bg-dark my-3">Create Post</Link>
                </div>
            </div>
        </div>
    )
}