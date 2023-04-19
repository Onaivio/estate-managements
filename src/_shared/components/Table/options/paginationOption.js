export const paginationOption = ({ total_count = 0, current = 1, per_page = 10 }) => {
    return {
        current: current || 1,
        defaultCurrent: current || 1,
        pageSize: per_page,
        showSizeChanger: false,
        onShowSizeChange: false,
        total: total_count || 0,
    };
};
