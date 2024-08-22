#!/usr/bin/env python3
"""
This module contains the Server class and the pagination helper function.
"""

import csv
import math
from typing import List, Tuple

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the start and end index for a given page and page size.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)

class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

        def dataset(self) -> List[List]:
            """Cached dataset"""
            if self.__dataset is None:
                with open(self.DATA_FILE) as f:
                    reader = csv.reader(f)
                    dataset = [row for row un reader]
                    self.__dataset = dataset[1:]
                    return self.__dataset

                def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
                    """
                    Returns the appropriate page of the dataset.

                    Args:
                    - page: The page number (1-indexed).
                    - page_size: The number of items per page.

                    Returns:
                    A list of lists containing the data for the requested page.
                    """
                    # Assert that page and page_size are integers greater than 0
                    assert isinstance(page, int) and page > 0,    "page must be a positive integer"
                    assert isinstance(page_size, int) and page_size > 0,    "page_size must be a positive integer"

                    # Get the start and end index for pagination
                    start_index, end_index = index_range(page, page_size)

                    # Get the dataset
                    data = self.dataset()

                    # If start_index is out of range, return an empty list
                    if start_index >= len(data):
                        return []

                    # Return the appropriate page of data
                    return data[start_index:end_index]
