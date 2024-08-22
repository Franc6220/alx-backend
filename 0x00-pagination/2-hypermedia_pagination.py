#!/usr/bin/env python3
"""
This module contains the Server class and the pagination helper function.
"""

import csv
import math
from typing import List, Tuple, Dict, Any

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Returns a tuple containing the start and end index for a given page
    and page size.
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
                    dataset = [row for row in reader]
                    self.__dataset = dataset[1:]
                    return self.__dataset

                def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
                    """
                    Returns the appropriate page of the dataset.
                    """
                    assert isinstance(page, int) and page > 0,
                    assert isinstance(page_size, int) and page_size > 0,

                    start_index, end_index = index_range(page, page_size)
                    data = self.dataset()

                    if start_index >= len(data):
                        return []

                    return data[start_index:end_index]

                def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
                    """
                    Returns a dictionary with pagination details.
                    """
                    data = self.get_page(page, page_size)
                    dataset_len = len(self.dataset())
                    total_pages = math.ceil(dataset_len / page_size)

                    # Calculate next_page and prev_page
                    next_page = page + 1 if page < total_pages else None
                    prev_page = page - 1 if page > 1 else None

                    # Return the dictionary
                    return {
                            'page_size': len(data),
                            'page': page,
                            'data': data,
                            'next_page': next_page,
                            'prev_page': prev_page,
                            'total_pages': total_pages
                            }
