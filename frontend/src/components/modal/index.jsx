import { useContext } from "react";

import { StoreContext } from "../../context";
import "./modal.css";

const Modal = ({ id }) => {
  const { modal } = useContext(StoreContext);
  return (
    <div>
      <div className="modal" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="custom-modal-content">
            <div className="border-none">
              <h5 className="modal-title modal-title-heading" id={id}>
                {modal.title}
              </h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="drop-down-heading">Project Name</label>
                  <input type="text" className="form-control custom-dropdown" id="newProjectName" placeholder="Enter Project Name" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="drop-down-heading">Select Group</label>
                  <select className="form-select custom-button custom-dropdown" aria-label="Default select example">
                    <option value="" disabled selected>
                      Select a group
                    </option>

                    <option value="Group 1">Group 1</option>
                    <option value="Group 2">Group 2</option>
                    <option value="Group 3">Group 3</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label drop-down-heading">
                    Select Domain
                  </label>
                  <select
                    className="form-select col-md-6 mb-3 custom-button custom-dropdown"
                    aria-label="Default select example"
                    placeholder="Select a domain"
                  >
                    <option value="" disabled selected>
                      Select a domain
                    </option>
                    <option value="Group 1">Domain Name 1</option>
                    <option value="Group 2">Domain Name 2</option>
                    <option value="Group 3">Domain Name 3</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label drop-down-heading">
                    Select Sub-Domain
                  </label>
                  <select
                    className="form-select col-md-6 mb-3 custom-button custom-dropdown"
                    aria-label="Default select example"
                    placeholder="Select a domain"
                  >
                    <option value="" disabled selected>
                      Select a Sub-domain
                    </option>
                    <option value="Group 1">Sub-domain Name 1</option>
                    <option value="Group 2">Sub-domain Name 2</option>
                    <option value="Group 3">Sub-domain Name 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" data-bs-dismiss="modal">
                {modal.cancel}
              </button>
              <button type="button" className="save-btn" data-bs-dismiss="modal">
                {modal.success}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
