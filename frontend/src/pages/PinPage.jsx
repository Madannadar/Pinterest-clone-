import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams();

  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHander = (id) => {
    if (confirm("Are you sure you want to delete this comment"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {pin && (
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg mt-8 overflow-hidden">
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-gray-200">
                {pin.image && (
                  <img
                    src={pin.image.url}
                    alt="Pin"
                    className="object-cover w-full h-64 md:h-auto rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                  />
                )}
              </div>

              {/* Pin Info Section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {edit ? (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border border-gray-300 rounded-lg p-2 w-1/2"
                      placeholder="Enter Title"
                    />
                  ) : (
                    <h1 className="text-2xl font-semibold text-gray-800">Title: {pin.title}</h1>
                  )}

                  {pin.owner && pin.owner._id === user._id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={editHandler}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={deletePinHandler}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>

                {edit ? (
                  <textarea
                    value={pinValue}
                    onChange={(e) => setPinValue(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                    placeholder="Enter Pin Description"
                  />
                ) : (
                  <p className="text-gray-700 mb-6">Description: {pin.pin}</p>
                )}

                {edit && (
                  <button
                    onClick={updateHandler}
                    className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 mb-4"
                  >
                    Update
                  </button>
                )}

                {/* Owner Info */}
                {pin.owner && (
                  <div className="flex items-center space-x-4 border-t pt-4 mt-4">
                    <Link to={`/user/${pin.owner._id}`}>
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white">
                        <span className="font-bold">{pin.owner.name.slice(0, 1)}</span>
                      </div>
                    </Link>
                    <div>
                      <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                      <p className="text-gray-500">{pin.owner.followers.length} Followers</p>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-6">
                  <form className="flex items-center space-x-2" onSubmit={submitHandler}>
                    <input
                      type="text"
                      placeholder="Enter Comment"
                      className="flex-1 border border-gray-300 rounded-lg p-2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      Add+
                    </button>
                  </form>

                  <hr className="my-4 border-gray-300" />

                  <div className="overflow-y-auto max-h-64">
                    {pin.comments && pin.comments.length > 0 ? (
                      pin.comments.map((e, i) => (
                        <div key={i} className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Link to={`/user/${e.user}`}>
                              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                <span className="font-bold">{e.name.slice(0, 1)}</span>
                              </div>
                            </Link>
                            <div>
                              <h2 className="text-lg font-semibold">{e.name}</h2>
                              <p className="text-gray-500">{e.comment}</p>
                            </div>
                          </div>

                          {e.user === user._id && (
                            <button
                              onClick={() => deleteCommentHander(e._id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                            >
                              <MdDelete />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">Be the first to comment</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinPage;
