import React, { useEffect, useRef, useState } from "react";
import Layout from "../../component/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { createBlogInitialPayload } from "../../payload";
import { axiosPost } from "../../axiosInstance";
import { addPost, updatePost } from "../../endpoint";
import { notifyError, notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

const CreateBlog = () => {
  const [blogForm, setBlogForm] = useState(createBlogInitialPayload);
  const [editorValue, setEditorValue] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const textRef = useRef(null);
  const tagInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const { state } = useLocation();
  const navigate = useNavigate();

  const autoResizeTextarea = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleBlogForm = (e) => {
    const { name, value, type, files } = e.target;

    if (type !== "file") {
      setBlogForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          setBlogForm((prev) => ({
            ...prev,
            Image: base64String,
          }));
          setImagePreview(URL.createObjectURL(file));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    const text = tagInput.trim();
    if (text && !tags.includes(text) && tags.length < 5) {
      setTags([...tags, text]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmitBlog = async () => {
    if (!blogForm.Title.trim()) {
      notifyError("Title is required");
      return;
    }
    if (!editorValue.trim()) {
      notifyError("Content cannot be empty");
      return;
    }
    if (!blogForm.Category) {
      notifyError("Please select a category");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axiosPost.post(isUpdating ? updatePost : addPost, {
        ...blogForm,
        Tag: tags,
        Description: editorValue,
      });
      if (data?.Success) {
        notifySuccess(data?.Message);
        resetForm();
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      if (error?.response?.data?.Message || error?.response?.data?.message) {
        notifyError(
          error?.response?.data?.Message || error?.response?.data?.message
        );
      } else {
        notifyError("Failed to submit blog. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setIsUpdating(false);
    }
  };

  const resetForm = () => {
    setBlogForm(createBlogInitialPayload);
    setTags([]);
    setEditorValue("");
    setImagePreview(null);
    setTagInput("");
  };

  // Handle editing
  useEffect(() => {
    if (state) {
      setIsUpdating(true);
      setEditorValue(state?.Description || "");
      setBlogForm(state);
      setTags(state?.Tag || []);
      if (state.Image) {
        setImagePreview(state.Image);
      }
    }
  }, [state]);

  return (
    <Layout>
      <div className="w-full flex justify-center items-start min-h-screen mt-20 mb-10">
        <div className="w-full max-w-[1250px] rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <Toaster position="top-center" />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {isUpdating ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <textarea
                id="title"
                placeholder="Write your title here..."
                className="w-full bg-gray-50 rounded-lg border border-gray-300 outline-none px-4 py-3 text-xl text-gray-800 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ref={textRef}
                onInput={autoResizeTextarea}
                name="Title"
                value={blogForm.Title}
                onChange={handleBlogForm}
                rows={1}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  className={`w-full sm:w-48 h-48 rounded-lg border-2 border-dashed ${
                    imagePreview ? "border-transparent" : "border-gray-300"
                  } flex items-center justify-center cursor-pointer overflow-hidden bg-gray-100`}
                  onClick={() => fileInputRef.current.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <MdCloudUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Recommended size: 1200x630px
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-3">
                    A high-quality image makes your post more engaging. Upload
                    an image that represents your content.
                  </p>
                  <button
                    type="button"
                    className="self-start px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {imagePreview ? "Change Image" : "Select Image"}
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleBlogForm}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="Category"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  value={blogForm.Category}
                  onChange={handleBlogForm}
                >
                  <option value="">Select a category</option>
                  {/* {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))} */}
                  <option value="">Select</option>
                  <option value="technology">Technology</option>
                  <option value="fashion">Fashion</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <MdClose size={14} />
                      </button>
                    </div>
                  ))}
                  {tags.length < 5 && (
                    <div className="flex items-center">
                      <input
                        ref={tagInputRef}
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyDown}
                        placeholder={
                          tags.length ? "Add another..." : "Add tags..."
                        }
                        className="flex-1 bg-transparent outline-none text-sm min-w-[100px] py-1"
                      />
                      {tagInput && (
                        <button
                          type="button"
                          onClick={addTag}
                          className="ml-2 p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        >
                          <AiFillPlusCircle size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {tags.length}/5 tags (press Enter to add)
                </p>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={setEditorValue}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder="Write your content here..."
                  className="h-96"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmitBlog}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-sm font-medium text-white ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors flex items-center justify-center min-w-[100px]`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isUpdating ? "Updating..." : "Publishing..."}
                  </>
                ) : isUpdating ? (
                  "Update Post"
                ) : (
                  "Publish Post"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlog;
