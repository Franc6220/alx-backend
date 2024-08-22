#!/usr/bin/env python3
"""
This module contains a helper function for pagination.
"""

from typing import Tuple

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the start and end index for a given page and page size.

    Args:
    - page: The current page number (1-indexed).
    - page_size: The number of items per page.

    Returns:
    A tuple of size two: (start index, end index).
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
