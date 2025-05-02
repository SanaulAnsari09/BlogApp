import React, { useRef, useState } from "react";
import Layout from "../../component/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdCloudUpload } from "react-icons/md";
import { createBlogInitialPayload } from "../../payload";
import { axiosPost } from "../../axiosInstance";
import { addPost } from "../../endpoint";
import { notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";

const CreateBlog = () => {
  const [blogForm, setBlogForm] = useState(createBlogInitialPayload);
  const [editorValue, setEditorValue] = useState("");
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const autoResizeTextarea = () => {
    const textarea = textRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleBlogForm = (e) => {
    const { name, value, type, files } = e.target;

    if (!(type == "file")) {
      setBlogForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        setBlogForm((prev) => ({
          ...prev,
          Image: base64String,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      const text = inputRef.current.innerText.trim();
      let totalWordCount = 0;

      tags.forEach((tag) => {
        const singleTagArr = tag.split("");
        singleTagArr.forEach((_, ind) => {
          totalWordCount += 1;
        });
      });

      inputRef.current.innerText = "";
      if (text && !tags.includes(text) && totalWordCount <= 25) {
        setTags([...tags, text]);
        inputRef.current.innerText = "";
      }
    }

    if (key === "Backspace" && inputRef.current.innerText === "") {
      const filteredTag = tags.filter((_, ind) => ind != tags.length - 1);
      setTags(filteredTag);
    }
  };

  const handleSubmitBlog = async () => {
    try {
      const { data } = await axiosPost.post(addPost, {
        ...blogForm,
        Tag: tags,
        Description: editorValue,
      });
      if (data?.Success) {
        notifySuccess(data?.Message);
        setBlogForm(createBlogInitialPayload);
        setTags([]);
        setEditorValue("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="w-full min-h-screen max-w-[1200px] flex justify-center">
          <div className="w-full p-10">
            <Toaster />
            <textarea
              type="text"
              placeholder="Write your title..."
              className="h-16 w-full bg-gray-50 rounded border border-gray-300 outline-0 px-4 pt-6 text-2xl text-gray-700"
              ref={textRef}
              onInput={autoResizeTextarea}
              name="Title"
              value={blogForm.Title}
              onChange={handleBlogForm}
            />
            <div className="grid grid-cols-3 gap-5 my-3">
              <div className="w-full flex">
                <label htmlFor="image_upload" className="w-[100%]">
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="">Upload Image</label>
                    <div className="h-10 w-full bg-gray-100 rounded flex justify-center items-center gap-5 cursor-pointer border border-gray-300">
                      <span className="text-3xl text-blue-500">
                        <MdCloudUpload />
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="image_upload"
                  className="hidden"
                  onChange={handleBlogForm}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="">Category</label>
                <select
                  name="Category"
                  id=""
                  className="bg-gray-100 outline-0 h-10 rounded text-gray-700 border border-gray-300"
                  value={blogForm.Category}
                  onChange={handleBlogForm}
                >
                  <option value="">Select</option>
                  <option value="technology">Technology</option>
                  <option value="fashion">Fashion</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="">Tag</label>
                <div
                  className="flex items-center flex-wrap gap-1 px-2 py-1 rounded border border-gray-300 bg-gray-100 text-gray-800 min-h-[40px]"
                  onClick={() => inputRef.current.focus()}
                >
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-sm bg-blue-500 text-white rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  <div
                    ref={inputRef}
                    contentEditable
                    onKeyDown={handleKeyDown}
                    className="outline-none flex-1 min-w-[50px] text-sm py-1"
                    placeholder="Type and press Enter"
                    suppressContentEditableWarning={true}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full mt-10">
              <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={setEditorValue}
              />
            </div>

            <div className="w-full mt-5 flex justify-end">
              <button
                className="h-10 w-20 bg-blue-500 rounded text-white cursor-pointer"
                onClick={handleSubmitBlog}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
