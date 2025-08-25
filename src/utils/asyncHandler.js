const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

// This utility function wraps an asynchronous function (like an Express route handler)
// and catches any errors that occur during its execution, passing them to the next middleware.




// This is useful for error handling in Express applications, allowing you to avoid repetitive try-catch blocks in each route handler.The below is another way
// const asyncHandler = (fn) => (req, res, next) => {
//     try{
//         await fn(req, res, next);
//     }
//     catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         });
//     }
// }