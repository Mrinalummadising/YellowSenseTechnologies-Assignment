import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaPhone,
} from "react-icons/fa";

const BookMarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from local storage on component mount
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Book Marks
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Your bookmarked jobs will appear here.
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {bookmarks.length > 0 ? (
              bookmarks.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt={post.title}
                      src={post.creatives[0]?.file}
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <div className="mt-2 text-gray-600 flex flex-col space-y-1">
                        <p className="flex items-center">
                          <FaBuilding className="mr-2 text-blue-600" />
                          Company Name: {post.company_name}
                        </p>
                        <p className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-red-600" />
                          Location: {post.job_location_slug}
                        </p>
                        <p className="flex items-center">
                          <FaDollarSign className="mr-2 text-green-600" />
                          Salary:{" "}
                          {post.salary_min && post.salary_max
                            ? `₹${post.salary_min} - ₹${post.salary_max}`
                            : "Not Disclosed"}
                        </p>

                        <p className="flex items-center">
                          <FaPhone className="mr-2 text-green-600" />
                          Phone Number: {post.whatsapp_no}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No bookmarks available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
