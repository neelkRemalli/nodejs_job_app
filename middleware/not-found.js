

const notFoundMiddleware = (req, res)=> res.status(404).json({msg:'Route did not exists'})


export default notFoundMiddleware;