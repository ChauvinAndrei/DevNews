import webFail from '../../Assets/webFail.png';

import './NotFound.scss';

export const Error = () => {

    return (
    <>
        <div className="not--founding-container">
          <div className="not--founding-copy-container">
            <p>
              404, page not found.
            </p>
            <span className="not--founding-handle"><img src={webFail} alt={'fail web'}/></span>

          </div>
        </div>
    </>
    )
}