// paginateResults({
//   after,
//   pageSize,
//   results: allLaunches,
// })

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

// const getUsers = async (lastId, limit) => {
//     const cursor = lastId || 0;
//     return await User.findAll({
//         limit: limit,
//         where: {
//             id: {
//                 [Op.gt]: cursor
//             }
//         }
//     });
// }

// SELECT * FROM users
// WHERE team_id = %team_id
// AND id <= %cursor
// ORDER BY id DESC
// LIMIT %limit

/**
 * 1 Riddo
 * 2 Adebayo
 * 3 Olamide
 * 4 Shayo
 * 5 Joel
 * 6 Joseph
 * 7 Samuel
 * 8 Peter
 * 9 Stephen
 * 10 Tunde
 */

/**
 *  It is common practice to base 64 encode cursors ( something unique like ID to 
 * base64 encode )
 * To implement cursor based pagination one will need,  limit(page[size]),after,
 * before
 * 
 * after(Next Paging) - WHERE id < after (req sent from query)
 * e.g limit=25&after=MTAxNTExOTQ1MjAwNzI5NDE=
 * 
 * before(Prev Paging) - WHERE id > before (req sent from query) 
 * e.g limit=25&before=NDMyNzQyODI3OTQw
 * 
 * FB Example
 * "cursors": {
      "after": "MTAxNTExOTQ1MjAwNzI5NDE=",
      "before": "NDMyNzQyODI3OTQw"
    },
    "previous": "https://graph.facebook.com/me/albums?limit=25&before=NDMyNzQyODI3OTQw",
    "next": "https://graph.facebook.com/me/albums?limit=25&after=MTAxNTExOTQ1MjAwNzI5NDE=" 
 *
 * */

exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return []

  if (!cursor) return results.slice(0, pageSize)
  const cursorIndex = results.findIndex((item) => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item)

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize)
}
