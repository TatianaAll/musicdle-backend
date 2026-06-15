export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const hasPermission = allowedRoles.some(role => req.user.roles?.includes(role));
    if (!hasPermission) {
      return res.status(403).json({ error: 'Accès interdit' });
    }
    next();
  };
};